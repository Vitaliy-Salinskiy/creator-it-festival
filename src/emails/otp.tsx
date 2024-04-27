import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VerifyEmailProps {
  verificationCode?: string;
  imageSourceUrl: string;
}

export default function VerifyEmail({
  verificationCode = "284188",
  imageSourceUrl,
}: VerifyEmailProps) {
  const imageSource =
    imageSourceUrl || "https://creator-it-festival.vercel.app";

  return (
    <Html>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </Head>
      <Body className="main">
        <Container style={container}>
          <Section style={imageSection}>
            <Img
              src={`${imageSource}/logo.png`}
              width="180"
              height="112"
              alt="Logo"
            />
          </Section>
          <Section style={upperSection}>
            <Heading style={h1}>
              Підтвердіть свою адресу електронної пошти
            </Heading>
            <Text style={mainText}>
              Підтвердіть свою адресу електронної пошти для участі в найбільшому
              конкурсі в історії Creator Academy - &quot;Creator Festival&quot;.
              Ми хочемо переконатися, що це справді ви. Будь ласка, введіть
              наступний код підтвердження, щоб долучитись до нас.
            </Text>
            <Section style={verificationSection}>
              <Text style={verifyText}>Код підтвердження</Text>
              <Text style={codeText}>{verificationCode}</Text>
              <Text style={validityText}>(Код дійсний лише 5 хвилин)</Text>
            </Section>
          </Section>
          <Hr />
          <Section style={lowerSection}>
            <Text style={cautionText}>
              Якщо ви не бажаєте створювати обліковий запис, або це не були ви,
              можете проігнорувати це повідомлення. Дякуємо за розуміння,
              бажаємо вам успіхів у конкурсі.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const style = `
.main{
    background-color: #262534;
    color: #fff;
    padding: 20px 0;
}

@media (max-width: 512px) {
    .main {
        padding: 0;
    }
}
`;

const container = {
  border: "1px solid #F5A006",
  overflow: "hidden",
  boxShadow: "0 0 3px 1px rgba(245,160,6,1)",
  borderRadius: "8px",
  margin: "0 auto",
  backgroundColor: "#3F3D56",
};

const h1 = {
  color: "#fff",
  maxWidth: "300px",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const text = {
  color: "#fff",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#262534",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
  margin: "10px 0",
  textAlign: "center" as const,
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const verificationSection = {
  margin: "0 auto",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
