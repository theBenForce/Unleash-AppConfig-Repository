import * as AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { AppConfigRepository } from '../src/index';
import { initialize, destroy } from 'unleash-client';
import { FeatureInterface } from 'unleash-client/lib/feature';

describe('Integration', () => {
  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('AppConfig', 'getConfiguration', (params, callback) => {
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
            strategies: [],
          },
        ] as Array<FeatureInterface>),
      });
    });
  });

  it('should work from unleash', async () => {
    const appConfig = new AWS.AppConfig();

    const unleash = initialize({
      appName: 'abc',
      url: 'not-required',
      repository: new AppConfigRepository({
        applicaion: 'abc',
        environment: 'production',
        configuration: 'featureFlags',
        clientId: '123',
        appConfig,
      }),
    });

    await unleash.start();
    const fallback = jest.fn().mockReturnValue(false);
    const result = unleash.isEnabled('Test', undefined, fallback);
    destroy();

    expect(fallback).not.toBeCalled();
    expect(result).toBe(true);

  });
});