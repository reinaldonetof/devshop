const initialUser = (db) => async (id) => {
  const count = await db("users").count("id as total");
  if (count[0].total === 0) {
    const user = {
      name: "Admin",
      email: "admin@devshop.com.br",
      passwd: "a definir",
      email_checked: true,
      created: new Date(),
      updated: new Date(),
    };
    await db("users").insert(user);
  }
  console.log(count);
};

module.exports = {
  initialUser,
};
