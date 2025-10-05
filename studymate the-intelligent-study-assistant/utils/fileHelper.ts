
import { Part } from '@google/genai';

const fileToGenerativePart = (file: File): Promise<Part> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result !== 'string') {
                return reject(new Error('Failed to read file.'));
            }
            const base64Data = reader.result.split(',')[1];
            resolve({
                inlineData: {
                    mimeType: file.type,
                    data: base64Data,
                },
            });
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

const isSupportedFileType = (file: File) => {
    const supportedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const supportedTextTypes = ['text/plain'];
    return supportedImageTypes.includes(file.type) || supportedTextTypes.includes(file.type);
}


export { fileToGenerativePart, isSupportedFileType };
