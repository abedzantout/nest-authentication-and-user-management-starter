import { Injectable } from '@nestjs/common';
import { ConsentRegistry } from '../schemas/consent-registry.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ConsentRegistryService {
  constructor(
    @InjectModel(ConsentRegistry.name)
    private readonly consentRegistryModel: Model<ConsentRegistry>,
  ) {}

  public async saveUserConsent(email: string): Promise<ConsentRegistry> {
    const userConsent = {
      email: email,
      privacy_policy: 'privacy policy',
      accepted_policy: true,
      checkbox_text: 'I accept privacy policy',
      cookie_policy: true,
      date: new Date(),
    };
    return await this.consentRegistryModel.create({ ...userConsent });
  }

  public async deleteConsent(email: string): Promise<any> {
    return await this.consentRegistryModel.findOneAndDelete({ email }).exec();
  }
}
