import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

import { monthNames } from "@/constants";

export const POST = async (req: NextRequest) => {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

  const { to } = await req.json();

  if (!to) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const transpoerter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const currentDate = new Date();

    const mailOptions = {
      from: SMTP_EMAIL,
      to: to,
      subject: otp,
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Static Template</title>
      
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          style="
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: #ffffff;
            font-size: 14px;
          "
        >
          <div
            style="
              max-width: 680px;
              margin: 0 auto;
              padding: 45px 30px 60px;
              background: #f4f7ff;
              background-image: url(https://media.istockphoto.com/id/1350036914/vector/vector-cartoon-background-with-color-abstract-dots.jpg?s=612x612&w=0&k=20&c=1XVtlTiz80yMFlf1xJc58kc9MfYJszIrtUEI4cotV6k=);
              background-repeat: no-repeat;
              background-size: 800px 452px;
              background-position: top center;
              font-size: 14px;
              color: #434343;
            "
          >
            <header>
              <table style="width: 100%;">
                <tbody>
                  <tr style="height: 0;">
                    <td>
                      <img
                        alt=""
                        src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1663574980688_114990/archisketch-logo"
                        height="30px"
                      />
                    </td>
                    <td style="text-align: right;">
                      <span
                        style="font-size: 16px; line-height: 30px; color: #ffffff;"
                        >${currentDate.getDate()} ${
        monthNames[currentDate.getMonth()]
      }, ${currentDate.getFullYear()}</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </header>
      
            <main>
              <div
                style="
                  margin: 0;
                  margin-top: 70px;
                  padding: 92px 30px 115px;
                  background: #ffffff;
                  border-radius: 30px;
                  text-align: center;
                "
              >
                <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                  <h1
                    style="
                      margin: 0;
                      font-size: 24px;
                      font-weight: 500;
                      color: #1f1f1f;
                    "
                  >
                    Your OTP
                  </h1>
                  <p
                    style="
                      margin: 0;
                      margin-top: 25px;
                      font-size: 40px;
                      font-weight: 600;
                      letter-spacing: 25px;
                      color: #ba3d4f;
                    "
                  >
                    ${otp}
                  </p>
                </div>
              </div>
      
              <p
                style="
                  max-width: 400px;
                  margin: 0 auto;
                  margin-top: 90px;
                  text-align: center;
                  font-weight: 500;
                  color: #8c8c8c;
                "
              >
                Need help? Ask at
                <a
                  href="mailto:salinskiyvitaliy@gmail.com"
                  style="color: #499fb6; text-decoration: none;"
                  >salinskiyvitaliy@gmail.com</a
                >
                or visit our
                <a
                  href="https://creator-it-academy.com"
                  target="_blank"
                  style="color: #499fb6; text-decoration: none;"
                  >Help Center</a
                >
              </p>
            </main>
          </div>
        </body>
      </html>
      `,
    };

    const mail = await transpoerter.sendMail(mailOptions);

    cookies().set("otp", otp, { maxAge: 5 * 60 * 1000, httpOnly: true });

    return NextResponse.json({ mail }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
};
