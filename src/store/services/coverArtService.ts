import axios, { AxiosResponse } from 'axios';
import {Buffer} from 'buffer';

export const coverArtApi = {
  downloadCoverArt: async (albumId: string): Promise<string | null> => {
    try {
      const coverArtUrl = `https://coverartarchive.org/release/${albumId}/front`;
      const response: AxiosResponse = await axios.get(coverArtUrl, { responseType: 'arraybuffer' });

      if (response.status === 200) {
          const base64Image = Buffer.from(response.data, 'binary').toString('base64');
          return `data:image/jpeg;base64,${base64Image}`;
      }
    } catch (error) {
        console.error('Error fetching album cover:', error);
    }
    
    return null;
  }
}