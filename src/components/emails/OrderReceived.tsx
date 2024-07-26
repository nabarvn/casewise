import styles from "./styles.module.css";

import { absoluteUrl } from "@/lib/utils";
import { ShippingAddress } from "@prisma/client";

import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const OrderReceivedEmail = ({
  orderId,
  orderDate,
  shippingAddress,
}: {
  orderId: string;
  orderDate: string;
  shippingAddress: Omit<ShippingAddress, "id" | "phoneNumber">;
}) => (
  <Html>
    <Head />
    <Preview>Your order summary and estimated delivery date</Preview>

    <Body className={styles.main}>
      <Container className={styles.container}>
        <Section className={styles.message}>
          <Img
            src={absoluteUrl("/logo-base.png")}
            alt="logo base"
            width="65"
            height="73"
            style={{ margin: "auto" }}
          />

          <Heading className={styles.heading}>Thanks for your order!</Heading>

          <Text className={styles.text}>
            We&apos;re preparing your order for delivery and will notify you
            once your package has been shipped. Delivery usually takes 2 days.
          </Text>

          <Text className={styles.text} style={{ marginTop: "24px" }}>
            If you have any questions regarding your order, please feel free to
            contact us with your order number. We&apos;re here to help.
          </Text>
        </Section>

        <Hr className={styles.hr} />

        <Section className={styles.defaultPadding}>
          <Text className={styles.adressTitle}>
            Shipping to: {shippingAddress.name}
          </Text>

          <Text className={styles.text} style={{ fontSize: "14px" }}>
            {shippingAddress.street}, {shippingAddress.city},&nbsp;
            {shippingAddress.state} {shippingAddress.postalCode}
          </Text>
        </Section>

        <Hr className={styles.hr} />

        <Section className={styles.defaultPadding}>
          <Row
            style={{
              display: "inline-flex",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            <Column style={{ width: "170px" }}>
              <Text className={styles.paragraphWithBold}>Order Number</Text>
              <Text className={styles.trackNumber}>{orderId}</Text>
            </Column>

            <Column>
              <Text className={styles.paragraphWithBold}>Order Date</Text>
              <Text className={styles.trackNumber}>{orderDate}</Text>
            </Column>
          </Row>
        </Section>

        <Hr className={styles.hr} />

        <Section className={styles.paddingY}>
          <Row>
            <Text
              style={{
                paddingTop: "30px",
                paddingBottom: "20px",
              }}
              className={styles.footerText}
            >
              Please reach out if you have any questions. Do not reply to this
              email as we won&apos;t be able to view it.
            </Text>
          </Row>

          <Row>
            <Text className={styles.footerText}>
              &copy; Casewise, Inc. All Rights Reserved.
            </Text>
          </Row>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default OrderReceivedEmail;
