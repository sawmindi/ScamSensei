import { describe, expect, it, vi } from 'vitest';
import { postUserData, searchUser, updateUpvotes } from '../controllers/scam-controller';
import { LoginUser } from '../models/Scam-user';

const createMockUser = (overrides = {}) => ({
  name: 'sachithra',
  title: 'test title',
  district: 'Colombo',
  scam: 'Test scam body',
  upvotes: 0,
  downvotes: 0,
  myFile: 'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  _id: '65f883e143c7efea55a23db9',
  __v: 0,
  save: vi.fn().mockResolvedValue({ ...overrides }),
});

vi.mock('../models/Scam-user', () => ({
  LoginUser: {
    findOne: vi.fn(),
    findById: vi.fn(),
    mockImplementation: () => createMockUser(),
  },
}));



describe('searchUser', () => {
  it('should return user data if user is found', async () => {
    const req = {
      query: {
        name: 'sachithra',
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    const expectedUser = createMockUser();
    LoginUser.findOne.mockResolvedValue(expectedUser);

    await searchUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(expectedUser);
  });

  it('should return 404 if user is not found', async () => {
    const req = {
      query: {
        name: 'nonexistent',
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    LoginUser.findOne.mockResolvedValue(null);

    await searchUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ error: 'User not found' });
  });
});

describe('updateUpvotes', () => {
  it('should increment upvotes for the user', async () => {
    const req = {
      body: {
        id: '65f32e9162ad70e5cca7f5a8',
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    const initialMockUser = createMockUser();
    const updatedMockUser = createMockUser({ upvotes: 1 });

    LoginUser.findById.mockResolvedValue({
      ...initialMockUser,
      save: vi.fn().mockResolvedValue(updatedMockUser),
    });

    await updateUpvotes(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(updatedMockUser);
  });

  it('should return 404 if user is not found', async () => {
    const req = {
      body: {
        id: 'nonexistent',
      },
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    LoginUser.findById.mockResolvedValue(null);

    await updateUpvotes(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ error: 'User not found' });
  });
});


