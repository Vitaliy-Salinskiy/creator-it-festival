import {
  Tailwind,
  Html,
  Text,
  Container,
  Img,
  Section,
  Body,
  Hr,
  Font,
  Head,
  Link,
} from "@react-email/components";
import * as React from "react";

interface WinnerEmailProps {
  imageSourceUrl: string;
  prizeImg: string;
}

export default function Email({ imageSourceUrl, prizeImg }: WinnerEmailProps) {
  const imageSource =
    imageSourceUrl || "https://creator-it-festival.vercel.app";
  const prizeImage = prizeImg || "email-prize.png";

  return (
    <Html>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Tailwind
          config={{
            theme: {
              extend: {
                colors: {
                  "dark-violet": "#262534",
                  "light-violet": "#3F3D56",
                  orange: "#F5A006",
                },
              },
            },
          }}
        >
          <Body className="bg-dark-violet !text-white py-14 body">
            <Container
              style={{
                border: "1px solid #F5A006",
                boxShadow: "0 0 3px 1px rgba(245,160,6,1)",
              }}
              className="bg-light-violet rounded-md py-[50px] container-padding"
            >
              <Section className="w-full">
                <Section className="flex flex-col items-center">
                  <Text className="w-full text-center text-[40px] leading-[48px] font-semibold test heading">
                    Вітаю з перемогою !
                  </Text>
                  <Img
                    src={`${imageSource}/pc.png`}
                    alt="pc"
                    className="w-4/5 mx-auto mt-5"
                  />
                </Section>
                <Section className="mt-[80px] prize-section">
                  <Text className="text-center text-[32px] leading-[36px] font-semibold heading-2">
                    Тобі випав мерч !
                  </Text>
                  <Img
                    src={`${imageSource}/${prizeImage}`}
                    alt="Prize"
                    className="mx-auto max-w-[275px] max-h-[275px] w-full h-full prize-img"
                  />
                  <Text className="mx-auto text-center text-[20px] leading-6 font-medium mt-[30px] sub-heading">
                    Не забудь забрати свій приз від викладачів
                  </Text>
                </Section>
                <Hr className="w-full mt-[125px] mb-[50px] h-0.5 bg-white/40 border-none hr-margins" />
                <Section className="px-[40px] footer-info">
                  <Text className="text-[15px] leading-[18px] text-center text">
                    Ви отримали це повідомлення на електронну пошту, так як ви
                    намагалися приєднатися до розіграшу призів на{" "}
                    <Link
                      href="https://creator-it-festival.vercel.app"
                      className="text-orange underline"
                    >
                      Creator Fest.
                    </Link>{" "}
                    Якщо ви цього не робили, просто проігноруйте це
                    повідомлення. Це унікальний код, який був згенерований нашою
                    системою безпеки. Будь ласка, щоб уникнути проблем, нікому
                    не показуйте та не розголошуйте шестизначний код, який вам
                    прийшов.
                  </Text>

                  <Text className="text-[15px] leading-[18px] text-center mt-2.5 text">
                    З повагою, менеджер з питань безпеки Creator Fest.
                  </Text>
                </Section>
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Head>
    </Html>
  );
}

const styles = `
 @media (max-width:512px) {
  .prize-img{
    max-width: 175px !important;
    max-height: 175px !important;
  }

  .prize-section{
    margin-top: 35px !important;
  }

  .footer-info{
    padding: 0 15px !important;
  }

  .hr-margins{
    margin-top: 35px !important;
    margin-bottom: 15px !important;
  }

  .container-padding{
    padding: 20px 0 !important;
  }

  .heading{
    font-size: 28px !important;
    line-height: 34px !important;
  }

  .heading-2{
    font-size: 26px !important;
    line-height: 30px !important;
  }

  .text{
    font-size: 13px !important;
    line-height: 17px !important;
  }

  .body{
    padding: 0 0 !important;
  }

  .sub-heading{
    font-size: 19px !important;
    line-height: 21px !important; 
    max-width: 275px !important;
  }
 }
`;
