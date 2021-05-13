import { Injectable } from '@angular/core';
import { EnvironmentInterface } from 'core-component';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService implements EnvironmentInterface {

    oauthServerUrl(): string {
        return environment.oauthServerUrl
    }
    resourceBaseUrl(): string {
        return environment.resourceBaseUrl
    }
    resourceBasePartnerUrl(): string {
        return environment.resourceBasePartnerUrl
    }
    atomBaseUrl(): string {
        return environment.atomBaseUrl
    }
    clientId(): string {
        return environment.clientId
    }
    clientSecret(): string {
        return environment.clientSecret
    }
    oauthTokenPath(): string {
        return environment.oauthTokenPath
    }
    oauthCheckTokenPath(): string {
        return environment.oauthCheckTokenPath
    }
    ssoEnable(): boolean {
        return environment.ssoEnable
    }
    clientApiToken(): string {
        return environment.clientApiToken
    }

    // partnerWebSite(): string {
    //     return environment.partnerWebSite
    // }
}
