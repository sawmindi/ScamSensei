import { getAllUsers, getUsers, userSignup, userLogin, count } from '../controllers/user-controllers';
import { describe, expect, it, vi } from 'vitest';
import ChatUser from '../models/Chat-user';
import { hash } from 'bcrypt';

vi.mock('bcrypt', () => ({
  hash: vi.fn().mockResolvedValue('hashedPassword'),
}));

vi.mock('../models/Chat-user', () => ({
  default: {
    find: () => ({
      count: vi.fn().mockResolvedValue(14),
    }),
    findOne: vi.fn(),
    __esModule: true,
  },
}));

const COOKIE_NAME = 'testCookie';

describe('userSignup', () => {

  // this should be double checked

  // it('should create a new user', async () => {
  //   const req = {
  //     body: {
  //       name: 'John',
  //       email: 'john@example.com',
  //       password: 'password123',
  //     },
  //   };
  //   const res = {
  //     status: vi.fn().mockReturnThis(),
  //     json: vi.fn(),
  //     clearCookie: vi.fn(),
  //     cookie: vi.fn(),
  //   };

  //   ChatUser.findOne.mockResolvedValue(null);

  //   await userSignup(req, res);

  //   expect(res.status).toHaveBeenCalledWith(201);
  //   expect(res.json).toHaveBeenCalledWith({
  //     message: 'User created',
  //     name: 'John',
  //     email: 'john@example.com',
  //   });
  //   expect(res.cookie).toHaveBeenCalledWith(COOKIE_NAME, expect.any(String), expect.any(Object));
  // });

  it('should return error if user already exists', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    ChatUser.findOne.mockResolvedValue({ email: 'john@example.com' });

    await userSignup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'User already exists' });
  });

  it('should handle internal server error', async () => {
    const req = {
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    ChatUser.findOne.mockRejectedValue(new Error('Internal Server Error'));

    await userSignup(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error cant create new user' });
  });
});

describe('count', () => {
  it('should return count of users', async () => {
    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    await count(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ users: 14 });
  });
});

describe('getUsers', () => {
  it('should return user data', async () => {
    const req = {
      body: {
        email: 'test234@gmail.com',
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const mockUserData = {
      myFile: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
      _id: "65d98f4bbfc001d76bfd87c1",
      name: "testname234",
      email: "test234@gmail.com",
      password: "$2b$10$y5KjIFEqGxHrU.wHxS6ysOYqBhPmPx/8FNJq9W67Z.GYr23VPLcvS",
      chats: [],
      __v: 0
    };

    ChatUser.findOne.mockResolvedValue(mockUserData);

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User Data',
      userData: mockUserData,
    });
  });

  it('should handle errors', async () => {
    const req = {
      body: {
        email: 'test234@gmail.com',
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    ChatUser.findOne.mockRejectedValue(new Error('Internal Server Error'));

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
