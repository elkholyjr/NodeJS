import userRepository from "./user.repository.js";

class UserService {
  async signup(data) {
    const existingUser = await userRepository.findByEmail(
      data.email
    );

    if (existingUser) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }

    const user = userRepository.build(data);

    await userRepository.save(user);

    return user;
  }

  async createOrUpdate(data) {
    return await userRepository.upsert(data);
  }

  async findByEmail(email) {
    return await userRepository.findByEmail(email);
  }

  async findById(id) {
    return await userRepository.findByIdWithoutRole(id);
  }
}

export default new UserService();