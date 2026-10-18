

const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Russell api",
    version: "1.0.0",
    description: "Documentation api du serveur russell Catways"
  },
  servers: [{
    url: "http://localhost:3000/api", description: "local dev"
  }],
  tags: [
    { name: "Index" },
    { name: "Auth" },
    { name: "Users" },
    { name: "Catways" },
    { name: "Reservations" },
    { name: "Catway Reservations" }
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token"
      }
    },
    schemas: {
      ErrorMessage: {
        type: "object",
        properties: {
          message: { type: "String", example: "server error" }
        }
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string", example: "6706f95..." },
          username: { type: "string", example: "darwin" },
          email: { type: "string", format: "email", example: "test@test.com" }
        }
      },
      UserInput: {
        type: "object",
        required: ["username", "email", "password"],
        properties: {
          username: { type: "string", minLength: 3, maxLength: 15, example: "darwin" },
          email: { type: "string", format: "email", example: "test@test.com" },
          password: { type: "string", minLength: 6, example: "123456" }
        }
      },
      LoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "test@test.com" },
          password: { type: "string", example: "123456" }
        }
      },
      Catway: {
        type: "object",
        properties: {
          id: { type: "string", example: "6706f95..." },
          catwayNumber: { type: "integer", example: 12 },
          catwayType: { type: "string", example: "long" },
          catwayState: { type: "string", example: "bon état" }
        }
      },
      CatwayInput: {
        type: "object",
        required: ["catwayNumber", "catwayType", "catwayState"],
        properties: {
          catwayNumber: { type: "integer", example: 12 },
          catwayType: { type: "string", example: "long" },
          catwayState: { type: "string", example: "bon état" }
        }
      },
      Reservation: {
        type: "object",
        properties: {
          id: { type: "string", example: "6706f95..." },
          catwayNumber: { type: "integer", example: 12 },
          clientName: { type: "string", example: "Alice Martin" },
          boatName: { type: "string", example: "Albator" },
          startDate: { type: "string", format: "date-time", example: "2026-10-12T10:00:00.000Z" },
          endDate: { type: "string", format: "date-time", example: "2026-10-12T10:00:00.000Z" },
        }
      },
      ReservationInput: {
        type: "object",
        required: ["catwayNumber", "clientName", "boatName", "startDate", "endDate"],
        properties: {
          catwayNumber: { type: "integer", example: 12 },
          clientName: { type: "string", example: "Alice Martin" },
          boatName: { type: "string", example: "Albator" },
          startDate: { type: "string", format: "date-time" },
          endDate: { type: "string", format: "date-time" },
        }
      }
    }
  },
  paths: {
    "/": {
      get: {
        tags: ["index"],
        summary: "API status",
        responses: { 200: { description: "Bienvenue api" } }
      }
    },
    "/login": {
      post: {
        tags: ["Auth"],
        summary: "User connection",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginInput" }
            }
          }
        },
        responses: {
          200: { description: "Login successful (cookie token set)" },
          400: { description: "Wrong credentials", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorMessage" } } } },
          401: { description: "Incorrect password", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorMessage" } } } }
        }
      }
    },
    "/logout": {
      get: {
        tags: ["Auth"],
        summary: "Déconnexion utilisateur",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Session terminated" },
          401: { description: "Unauthorized" }
        }
      }

    },
    "/users": {
      post: {
        tags: ["Users"],
        summary: "Créer un utilisateur",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserInput" }
            }
          }
        },
        responses: {
          201: { description: "User created" },
          400: { description: "Email already exists" }
        }
      },
      get: {
        tags: ["Users"],
        summary: "Lister les utilisateurs",
        security: [{ cookieAuth: [] }],
        responses: {
          200: {
            description: "Users list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" }
                }
              }
            }
          },
          401: { description: "Unauthorized" }
        }
      }
    },
    "/users/{email}": {
      parameters: [
        {
          name: "email",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      get: {
        tags: ["Users"],
        summary: "Récupérer un utilisateur par email",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "User found" },
          404: { description: "User not found" }
        }
      },
      put: {
        tags: ["Users"],
        summary: "Modifier un utilisateur",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  email: { type: "string", format: "email" },
                  password: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "User edited" },
          404: { description: "User not found" }
        }
      },
      delete: {
        tags: ["Users"],
        summary: "Supprimer un utilisateur",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "User deleted" },
          404: { description: "User not found" }
        }
      }
    },
    "/catways": {
      post: {
        tags: ["Catways"],
        summary: "Créer un catway",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CatwayInput" }
            }
          }
        },
        responses: {
          201: { description: "Catway created" },
          409: { description: "Catway number already exists" }
        }
      },
      get: {
        tags: ["Catways"],
        summary: "Lister les catways",
        security: [{ cookieAuth: [] }],
        responses: {
          200: {
            description: "Catways list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Catway" }
                }
              }
            }
          }
        }
      }

    },
    "/catways/id": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "catwayNumber"
        }
      ],
      get: {
        tags: ["Catways"],
        summary: "Récupérer un catway",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Catway found" },
          404: { description: "Catway not found" }
        }
      },
      put: {
        tags: ["Catways"],
        summary: "Modifier un catway",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  catwayNumber: { type: "integer" },
                  catwayType: { type: "string" },
                  catwayState: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          201: { description: "Catway edited" },
          404: { description: "Catway not found" }
        }
      },
      delete: {
        tags: ["Catways"],
        summary: "Supprimer un catway",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Catway deleted" },
          404: { description: "Catway not found" }
        }
      }

    },
    "/reservations": {
      get: {
        tags: ["Reservations"],
        summary: "Lister toutes les réservations",
        security: [{ cookieAuth: [] }],
        responses: {
          200: {
            description: "Reservations list",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Reservation" }
                }
              }
            }
          }
        }
      }
    },
    "/catways/{id}/reservations": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "catwayNumber"
        }
      ],
      get: {
        tags: ["Catway Reservations"],
        summary: "Lister les réservations d'un catway",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Reservations found" },
          404: { description: "Catway/reservations not found" }
        }
      },
      post: {
        tags: ["Catway Reservations"],
        summary: "Créer une réservation pour un catway",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ReservationInput" }
            }
          }
        },
        responses: {
          201: { description: "Reservation created" },
          400: { description: "Conflict dates / invalid range" }
        }
      }

    },
    "/catways/{id}/reservations/{idReservation}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "integer" },
          description: "catwayNumber"
        },
        {
          name: "idReservation",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      get: {
        tags: ["Catway Reservations"],
        summary: "Récupérer une réservation d'un catway",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Reservation found" },
          404: { description: "Reservation not found" }
        }
      },
      put: {
        tags: ["Catway Reservations"],
        summary: "Modifier une réservation d'un catway",
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  catwayNumber: { type: "integer" },
                  clientName: { type: "string" },
                  boatName: { type: "string" },
                  startDate: { type: "string", format: "date-time" },
                  endDate: { type: "string", format: "date-time" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Reservation edited" },
          400: { description: "Invalid dates/conflict" },
          404: { description: "Reservation not found" }
        }
      },
      delete: {
        tags: ["Catway Reservations"],
        summary: "Supprimer une réservation d'un catway",
        security: [{ cookieAuth: [] }],
        responses: {
          200: { description: "Reservation deleted" },
          404: { description: "Reservation not found" }
        }
      }
    },
  }
};

export default openApiSpec;