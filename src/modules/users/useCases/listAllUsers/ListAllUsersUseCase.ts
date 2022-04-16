import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) { }

  execute({ user_id }: IRequest): User[] | undefined {
    const user = this.usersRepository.findById(user_id)

    if (!user) {
      throw new Error("You need to be logged to retrieve users list!")
    }
    if (user.admin === false) {
      throw new Error("Insufficient permissions")
    }
    const users = this.usersRepository.list()
    return users;
  }
}

export { ListAllUsersUseCase };
