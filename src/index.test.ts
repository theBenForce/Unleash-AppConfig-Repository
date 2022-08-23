import * as AWSMock from 'aws-sdk-mock';
import * as AWS from 'aws-sdk';
import { FeatureInterface } from 'unleash-client/lib/feature';
import { AppConfigRepository } from './';

describe('AppConfigRepository', () => {
  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('AppConfig', 'getConfiguration', (params, callback) => {
      console.info(params);

      callback(undefined, {
        ContentType: 'application/json',
        Content: JSON.stringify([
          {
            name: 'Test',
            enabled: true,
            type: 'release',
            impressionData: false,
            stale: false,
            variants: [],
            strategies: [
              {
                "name": "flexibleRollout",
                "constraints": [],
                "parameters": {
                  "groupId": "Test",
                  "rollout": "50",
                  "stickiness": "default"
                }
              }
            ]
          }
        ] as Array<FeatureInterface>)
      })
    });
  });

  it('should load data from appconfig', async () => {
    const appConfig = new AWS.AppConfig();

    const repo = new AppConfigRepository({
      applicaion: 'abc',
      environment: 'production',
      configuration: 'featureFlags',
      clientId: '123',
      appConfig,
    });

    await repo.start();

    const toggle = repo.getToggle('Test');

    expect(toggle).toHaveProperty('type', 'release');
  });
})