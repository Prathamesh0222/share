export const EmailTemplate = ({
  firstName,
  magicLink,
}: {
  firstName: string;
  magicLink: string;
}) => {
  return (
    <html>
      <body
        style={{
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.6",
          color: "#333",
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "40px 20px",
            borderRadius: "8px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <h1 style={{ color: "#2563eb", margin: "0" }}>Verify Your Email</h1>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ color: "#1f2937", marginTop: "0" }}>
              Hello {firstName}!
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: "#4b5563",
                marginBottom: "20px",
              }}
            >
              Thank you for signing up! Please verify your email address by
              clicking the button below:
            </p>

            <div style={{ textAlign: "center", margin: "30px 0" }}>
              <a
                href={magicLink}
                style={{
                  display: "inline-block",
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "14px 32px",
                  textDecoration: "none",
                  borderRadius: "6px",
                  fontWeight: "800",
                  fontSize: "16px",
                }}
              >
                Verify Email Address
              </a>
            </div>
          </div>
          <div
            style={{
              marginTop: "30px",
              textAlign: "center",
              fontSize: "14px",
              color: "#6b7280",
            }}
          >
            <p style={{ margin: "5px 0" }}>
              This link will expire in 24 hours.
            </p>
            <p style={{ margin: "5px 0" }}>
              If you didn&apos;t create an account, you can safely ignore this
              email.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
};
