import { describe, expect, it, vi } from 'vitest';
import { generateChatCompletion,sendChatsToUser,deleteChats } from '../controllers/chat-controllers';
import ChatUser from '../models/Chat-user';
import openai from 'openai';
import { chatCompletionsCreate } from 'openai';

vi.mock('../models/Chat-user', () => ({
  default: {
    findById: vi.fn(),
  },
}));

vi.mock('openai', () => {
  const chatCompletionsCreate = vi.fn();
  return {
    default: class {
      constructor() {
        this.chat = {
          completions: {
            create: chatCompletionsCreate,
          },
        };
      }
    },
    chatCompletionsCreate, 
  };
});

describe('generateChatCompletion', () => {
  it('should generate chat completion and return chats', async () => {
    const req = {
      body: {
        message: 'What can you do?',
      },
    };
    const res = {
      locals: {
        jwtData: {
          id: 'user123',
        },
      },
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const mockUser = {
      _id: 'user123',
      chats: [],
      save: vi.fn().mockResolvedValue(true),
    };

    ChatUser.findById.mockResolvedValue(mockUser);

    const mockChatResponse = {
      choices: [
        {
          message: {
            role: 'assistant',
            content: 'I can provide information on common scams targeting tourists, offer tips to avoid scams, and help you stay alert and safe during your travels.',
          },
        },
      ],
    };

    chatCompletionsCreate.mockResolvedValue(mockChatResponse);


    await generateChatCompletion(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      chats: [
        {
          role: 'user',
          content: 'What can you do?',
        },
        {
          role: 'assistant',
          content: 'I can provide information on common scams targeting tourists, offer tips to avoid scams, and help you stay alert and safe during your travels.',
        },
      ],
    });
  });

 
});



describe('sendChatsToUser', () => {
    it('should return chats for the user', async () => {
      const req = {};
      const res = {
        locals: {
          jwtData: {
            id: '65d995ea31d29d58c73a46e6',
          },
        },
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
  
      const mockUser = {
        _id: '65d995ea31d29d58c73a46e6',
        chats: [
          {
            role: 'user',
            content: 'What can you do?',
            _id: '65f877219f5d5bd18c630b41',
          },
          {
            role: 'assistant',
            content: 'I can provide information on common scams targeting tourists, offer tips to avoid scams, and help you stay alert and safe during your travels.',
            _id: '65f877239f5d5bd18c630b42',
          },
        ],
      };
  
      ChatUser.findById.mockResolvedValue(mockUser);
  
      await sendChatsToUser(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User located',
        chats: mockUser.chats,
      });
    });
  
   
  });


  
describe('deleteChats', () => {
    it('should delete chats for the user', async () => {
      const req = {};
      const res = {
        locals: {
          jwtData: {
            id: '65d995ea31d29d58c73a46e6',
          },
        },
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };
  
      const mockUser = {
        _id: '65d995ea31d29d58c73a46e6',
        chats: [
          {
            role: 'user',
            content: 'What can you do?',
            _id: '65f877219f5d5bd18c630b41',
          },
          {
            role: 'assistant',
            content: 'I can provide information on common scams targeting tourists, offer tips to avoid scams, and help you stay alert and safe during your travels.',
            _id: '65f877239f5d5bd18c630b42',
          },
        ],
        save: vi.fn().mockResolvedValue(true),
      };
  
      ChatUser.findById.mockResolvedValue(mockUser);
  
      await deleteChats(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Chats deleted" });
      expect(mockUser.chats).toEqual([]);
    });
  

  });