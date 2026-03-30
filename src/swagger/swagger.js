const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Alumni Influencers API",
      version: "1.0.0",
      description:
        "RESTful API for the Phantasmagoria Ltd alumni engagement platform. " +
        "Manages alumni registration, profiles, a blind bidding system, " +
        "and bearer-token access control for external clients.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT token received from POST /auth/login",
        },
      },
      schemas: {
        // ── Auth ──────────────────────────────────────────────
        RegisterRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "john.doe@westminster.ac.uk",
            },
            password: {
              type: "string",
              example: "Secure@123",
              description:
                "Min 8 chars, must include uppercase, number and special character",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "john.doe@westminster.ac.uk" },
            password: { type: "string", example: "Secure@123" },
          },
        },
        TokenRequest: {
          type: "object",
          required: ["token"],
          properties: {
            token: { type: "string", example: "abc123def456..." },
          },
        },
        ResetPasswordRequest: {
          type: "object",
          required: ["token", "new_password"],
          properties: {
            token: { type: "string", example: "abc123def456..." },
            new_password: { type: "string", example: "NewSecure@123" },
          },
        },

        // ── Profile ───────────────────────────────────────────
        ProfileRequest: {
          type: "object",
          required: ["full_name"],
          properties: {
            full_name: { type: "string", example: "John Doe" },
            biography: {
              type: "string",
              example: "Software engineer with 10 years experience",
            },
            linkedin_url: {
              type: "string",
              example: "https://linkedin.com/in/johndoe",
            },
            image_url: {
              type: "string",
              example: "https://example.com/photo.jpg",
            },
          },
        },

        // ── Degree ────────────────────────────────────────────
        DegreeRequest: {
          type: "object",
          required: ["degree_name", "institution"],
          properties: {
            degree_name: { type: "string", example: "BSc Computer Science" },
            institution: {
              type: "string",
              example: "University of Westminster",
            },
            institution_url: {
              type: "string",
              example: "https://westminster.ac.uk/courses/bsc-computer-science",
            },
            year_completed: { type: "string", example: "2020" },
          },
        },

        // ── Certification ─────────────────────────────────────
        CertificationRequest: {
          type: "object",
          required: ["certification_name", "provider"],
          properties: {
            certification_name: {
              type: "string",
              example: "AWS Solutions Architect",
            },
            provider: { type: "string", example: "Amazon Web Services" },
            provider_url: {
              type: "string",
              example: "https://aws.amazon.com/certification",
            },
            year_completed: { type: "string", example: "2022" },
          },
        },

        // ── Licence ───────────────────────────────────────────
        LicenceRequest: {
          type: "object",
          required: ["licence_name", "issuing_authority"],
          properties: {
            licence_name: {
              type: "string",
              example: "Project Management Professional",
            },
            issuing_authority: { type: "string", example: "PMI" },
            authority_url: {
              type: "string",
              example: "https://pmi.org/certifications/pmp",
            },
            year_completed: { type: "string", example: "2021" },
          },
        },

        // ── Short Course ──────────────────────────────────────
        ShortCourseRequest: {
          type: "object",
          required: ["course_name", "provider"],
          properties: {
            course_name: {
              type: "string",
              example: "Machine Learning Fundamentals",
            },
            provider: { type: "string", example: "Coursera" },
            provider_url: {
              type: "string",
              example: "https://coursera.org/learn/machine-learning",
            },
            year_completed: { type: "string", example: "2023" },
          },
        },

        // ── Employment ────────────────────────────────────────
        EmploymentRequest: {
          type: "object",
          required: ["company_name", "job_title"],
          properties: {
            company_name: { type: "string", example: "Google" },
            job_title: { type: "string", example: "Senior Software Engineer" },
            start_year: { type: "string", example: "2020" },
            end_year: {
              type: "string",
              example: "2023",
              description: "Leave empty if currently employed",
            },
          },
        },

        // ── Bid ───────────────────────────────────────────────
        BidRequest: {
          type: "object",
          required: ["bid_amount"],
          properties: {
            bid_amount: {
              type: "number",
              example: 250,
              description:
                "Must be greater than zero and higher than current bid",
            },
          },
        },

        // ── API Token ─────────────────────────────────────────
        ApiTokenRequest: {
          type: "object",
          required: ["client_name"],
          properties: {
            client_name: { type: "string", example: "AR Client v1" },
          },
        },

        // ── Error ─────────────────────────────────────────────
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "Something went wrong" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
