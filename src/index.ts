import { RepositoryInterface } from 'unleash-client/lib/repository';
import { EventEmitter } from 'events';
import { FeatureInterface } from 'unleash-client/lib/feature';
import { Segment } from 'unleash-client/lib/strategy/strategy';
import { AppConfig } from 'aws-sdk';
import { UnleashEvents } from 'unleash-client';

export interface AppConfigRepositoryConfig {
  applicaion: string;
  environment: string;
  configuration: string;
  clientId: string;
  clientConfiguration?: AppConfig.Types.ClientConfiguration;
  appConfig?: AppConfig;
}

export class AppConfigRepository extends EventEmitter implements RepositoryInterface {
  private appConfig: AppConfig;

  private data: Array<FeatureInterface> = [];

  private segments = new Map<number, Segment>();

  constructor(private config: AppConfigRepositoryConfig) {
    super();

    this.appConfig = config.appConfig ?? new AppConfig(config.clientConfiguration);
  }

  getToggle(name: string): FeatureInterface {
    const result = this.data.find(toggle => toggle.name === name);
    
    if (!result) {
      throw new Error(`Toggle ${name} not found`);
    }

    return result;
  }

  getToggles(): FeatureInterface[] {
    return this.data;
  }

  getSegment(id: number): Segment | undefined {
    return this.segments.get(id);
  }

  stop(): void {
    throw new Error('Method not implemented.');
  }

  async start(): Promise<void> {
    const response = await this.appConfig.getConfiguration({
      Application: this.config.applicaion,
      ClientId: this.config.clientId,
      Configuration: this.config.configuration,
      Environment: this.config.environment,
    }).promise();

    const rawData = response.Content?.toString();

    if (rawData) {
      this.data = JSON.parse(rawData);
    }

    this.emit(UnleashEvents.Ready);
  }

}