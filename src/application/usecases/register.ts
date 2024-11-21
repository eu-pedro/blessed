import { UsersRepository } from "../repository/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { UseCase } from "./usecase";

interface RegisterUserUseCaseRequest {
  email: string
  name: string
}

export class RegisterUserUseCase implements UseCase<RegisterUserUseCaseRequest, void> {
  constructor(private readonly userRepository: UsersRepository){}

  async execute({ name, email }: RegisterUserUseCaseRequest){
    const userAlreadyExists = await this.userRepository.findByEmail(email) 
    if(userAlreadyExists){
      throw new UserAlreadyExistsError()
    }

    await this.userRepository.create({
      name,
      email
    })
  }
}