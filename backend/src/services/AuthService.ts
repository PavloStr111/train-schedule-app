import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import dotenv from "dotenv";

dotenv.config({path: '../config.env'});

const userRepository = AppDataSource.getRepository(User);

export class AuthService {
  
  static async register(firstName: string, lastName: string, email: string, password: string): Promise<User> {
    const existingUser = await userRepository.findOneBy({ email });

    if (existingUser) 
        throw new AppError("Email already in use", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = userRepository.create({ firstName, lastName, email, password: hashedPassword });
    return await userRepository.save(user);
  }

  static async login(email: string, password: string): Promise<{ token: string }> {
    const user = await userRepository.findOneBy({ email });
    if (!user) 
        throw new AppError("Invalid credentials", 401);

    const validPassword = await bcrypt.compare(password, user.password);
    console.log(`key ${process.env.JWT_SECRET}`)
    if (!validPassword) 
        throw new AppError("Invalid credentials", 401);

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token };
  }
}
