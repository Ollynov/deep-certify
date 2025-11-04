import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { fileUrl, fileName } = await request.json();

    if (!fileUrl) {
      return NextResponse.json(
        { error: "File URL is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.REALITY_DEFENDER_API_KEY;

    if (!apiKey) {
      console.error("[v0] Reality Defender API key not found");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    console.log("[v0] Requesting presigned URL from Reality Defender");

    // Step 1: Request presigned URL
    const presignedResponse = await fetch(
      "https://api.prd.realitydefender.xyz/api/files/aws-presigned",
      {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: fileName,
        }),
      }
    );

    if (!presignedResponse.ok) {
      const errorText = await presignedResponse.text();
      console.error("[v0] Presigned URL request failed:", errorText);
      return NextResponse.json(
        { error: "Failed to get presigned URL" },
        { status: 500 }
      );
    }

    const { presignedUrl, requestId } = await presignedResponse.json();
    console.log("[v0] Got presigned URL, request ID:", requestId);

    // Step 2: Upload file to presigned URL
    const fileResponse = await fetch(fileUrl);
    const fileBlob = await fileResponse.blob();

    const uploadResponse = await fetch(presignedUrl, {
      method: "PUT",
      body: fileBlob,
    });

    if (!uploadResponse.ok) {
      console.error("[v0] File upload to presigned URL failed");
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    console.log("[v0] File uploaded, polling for results...");

    // Step 3: Poll for results (with timeout)
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds max
    let result = null;

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

      const resultResponse = await fetch(
        `https://api.prd.realitydefender.xyz/api/media/users/${requestId}`,
        {
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (resultResponse.ok) {
        const data = await resultResponse.json();
        console.log("[v0] Result response:", data);

        if (data.status === "completed" && data.ensemble) {
          result = data;
          break;
        }
      }

      attempts++;
    }

    if (!result) {
      return NextResponse.json({ error: "Analysis timeout" }, { status: 408 });
    }

    // Extract score from ensemble results
    const score = result.ensemble?.score || 0.5;

    console.log("[v0] Analysis complete. Score:", score);

    return NextResponse.json({
      score,
      requestId,
      status: result.status,
    });
  } catch (error) {
    console.error("[v0] Analysis error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
