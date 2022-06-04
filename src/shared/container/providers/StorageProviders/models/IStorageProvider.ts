export default interface IStorageProvider {
  saveFile(file: string, mimetype: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
