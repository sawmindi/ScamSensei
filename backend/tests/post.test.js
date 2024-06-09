
import { describe, expect, it, vi } from 'vitest';
import { postUserData, searchUser, updateUpvotes } from '../controllers/scam-controller';
import { LoginUser } from '../models/Scam-user';




const mockUser = {
    name: 'sachithra',
    title: 'test title',
    district: 'Colombo',
    scam: 'Test scam body',
    upvotes: 0,
    downvotes: 0,
    myFile: 'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    _id: '65f883e143c7efea55a23db9',
    __v: 0,
  };
  
  vi.mock('../models/Scam-user', () => ({
    LoginUser: vi.fn().mockImplementation(() => ({
      save: vi.fn().mockResolvedValue(mockUser),
    })),
  }));
  
  describe('postUserData', () => {
    it('should create a new user and return user data', async () => {
      const req = {
        body: {
          name: 'sachithra',
          title: 'test title',
          district: 'Colombo',
          scam: 'Test scam body',
          myFile: 'https://plus.unsplash.com/premium_photo-1680740103993-21639956f3f0?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      };
  
      await postUserData(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });
  });