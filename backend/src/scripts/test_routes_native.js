require("dotenv").config();
const app = require("../app");
const prisma = require("../config/db");

async function testRoutes() {
  console.log("Starting Route Integration and Validation tests...");
  
  // Start server on a dynamic/random port
  const server = app.listen(0);
  const port = server.address().port;
  const baseUrl = `http://localhost:${port}`;
  console.log(`Server started on ${baseUrl}`);

  try {
    // Generate a random unique email to prevent registration collision
    const testEmail = `test-admin-${Date.now()}@lrppune.org`;
    const password = "password123";

    // 1. Test registration
    console.log("\n1. Testing /auth/register...");
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail, password, role: "EDITOR" })
    });
    const regData = await regRes.json();
    console.log(`   Status: ${regRes.status}`);
    console.log("   Response:", JSON.stringify(regData));
    if (regRes.status !== 201 || !regData.success) {
      throw new Error("Registration test failed");
    }

    // 2. Test login
    console.log("\n2. Testing /auth/login...");
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: testEmail, password })
    });
    const loginData = await loginRes.json();
    console.log(`   Status: ${loginRes.status}`);
    console.log("   Response:", JSON.stringify(loginData));
    if (loginRes.status !== 200 || !loginData.token) {
      throw new Error("Login test failed");
    }
    const token = loginData.token;

    // 3. Test creating admin via admin controller route (should be successful)
    console.log("\n3. Testing /admin/ route (admin controller)...");
    const otherEmail = `test-admin-${Date.now() + 1}@lrppune.org`;
    const adminRes = await fetch(`${baseUrl}/admin/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: otherEmail, password: "securepassword", role: "SUPER_ADMIN" })
    });
    const adminData = await adminRes.json();
    console.log(`   Status: ${adminRes.status}`);
    console.log("   Response:", JSON.stringify(adminData));
    if (adminRes.status !== 201 || !adminData.success) {
      throw new Error("Admin creation route failed");
    }

    // 4. Test listing pillars
    console.log("\n4. Testing GET /api/pillars...");
    const pillarsRes = await fetch(`${baseUrl}/api/pillars`);
    const pillarsData = await pillarsRes.json();
    console.log(`   Status: ${pillarsRes.status}`);
    console.log(`   Pillars count: ${pillarsData.data ? pillarsData.data.length : 0}`);

    // 5. Test manual update of a pillar with valid JWT (EDITOR)
    console.log("\n5. Testing PUT /api/pillars/1 (Manual Update) - Valid JWT...");
    const updateRes = await fetch(`${baseUrl}/api/pillars/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ key: "Households Supported", value: "3000" })
    });
    const updateData = await updateRes.json();
    console.log(`   Status: ${updateRes.status}`);
    console.log("   Response:", JSON.stringify(updateData));
    if (updateRes.status !== 200 || !updateData.success) {
      throw new Error("Manual update failed");
    }

    // 6. Test parameter validation (nan check)
    console.log("\n6. Testing PUT /api/pillars/abc (Invalid ID)...");
    const invalidIdRes = await fetch(`${baseUrl}/api/pillars/abc`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ key: "Households Supported", value: "3000" })
    });
    const invalidIdData = await invalidIdRes.json();
    console.log(`   Status: ${invalidIdRes.status}`);
    console.log("   Response:", JSON.stringify(invalidIdData));
    if (invalidIdRes.status !== 400 || invalidIdData.success !== false) {
      throw new Error("Parameter nan validation check failed to reject request");
    }

    // 7. Test request body schema validation (key missing)
    console.log("\n7. Testing PUT /api/pillars/1 (Missing key)...");
    const missingKeyRes = await fetch(`${baseUrl}/api/pillars/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ value: "4000" })
    });
    const missingKeyData = await missingKeyRes.json();
    console.log(`   Status: ${missingKeyRes.status}`);
    console.log("   Response:", JSON.stringify(missingKeyData));
    if (missingKeyRes.status !== 400 || !missingKeyData.errors) {
      throw new Error("Zod validation check failed to reject request");
    }

    // 8. Test authorization check (invalid token format)
    console.log("\n8. Testing PUT /api/pillars/1 (Invalid JWT format)...");
    const badTokenRes = await fetch(`${baseUrl}/api/pillars/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `NotBearer ${token}`
      },
      body: JSON.stringify({ key: "Households Supported", value: "5000" })
    });
    const badTokenData = await badTokenRes.json();
    console.log(`   Status: ${badTokenRes.status}`);
    console.log("   Response:", JSON.stringify(badTokenData));
    if (badTokenRes.status !== 401) {
      throw new Error("Authorization format check failed to reject request");
    }

    console.log("\nAll route and validation tests passed successfully!");
  } catch (err) {
    console.error("\nRoute test runner failed:", err.message);
    process.exitCode = 1;
  } finally {
    // Clean up
    server.close();
    await prisma.$disconnect();
  }
}

testRoutes();
