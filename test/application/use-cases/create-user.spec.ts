import { InMemoryUserRepository } from "@test/doubles/repositories";
import { FakeEncryptService } from "@test/doubles/services";
import { EncryptService } from "@domain/interfaces";
import { UserViewModel } from "@shared/viewModels";
import { ValidationError } from "@domain/errors";
import { CreateUser } from "@application/user";
import { UserBuilder } from "@test/builders";
import { UserTypes } from "@domain/enums";

describe('CreateUser', () => {
    let encryptService: EncryptService;
    let createUser: CreateUser;

    beforeAll(() => {
        encryptService = new FakeEncryptService();
    });

    test('should create a new user with valid data', async () => {
        const emptyUserRepository = new InMemoryUserRepository([]);
        createUser = new CreateUser(emptyUserRepository, encryptService);

        const input = UserBuilder.user().type(UserTypes.Employee).build();
        const result = (await createUser.run(input)) as UserViewModel;
        const savedUser = await emptyUserRepository.findById(result.id);

        expect(input.password).toEqual(input.confirmPassword);
        expect(result.id).toBeDefined();
        expect(savedUser.password).toEqual(input.password + 'ENCRYPTED');
    })

    test('should not create a new user when user already exists', async () => {
        const validUser = UserBuilder.user().type(UserTypes.Employee).build();

        const userRepositoryWithSingleUser = new InMemoryUserRepository([validUser]);
        createUser = new CreateUser(userRepositoryWithSingleUser, encryptService);

        const result = createUser.run(validUser);
        expect(result).rejects.toThrow(ValidationError);
    })

    test('should not create a new user with invalid password', async () => {
        const emptyRepository = new InMemoryUserRepository([]);
        createUser = new CreateUser(emptyRepository, encryptService);

        const input = UserBuilder.user().type(UserTypes.Employee).withInvalidPassword().build();
        const result = createUser.run(input);
        
        expect(result).rejects.toThrow(ValidationError);
    })
});