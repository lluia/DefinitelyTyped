// Type definitions for next-auth 2.2
// Project: https://github.com/iaincollins/next-auth#readme
// Definitions by: Lluis <https://github.com/lluia>
//                 Iain <https://github.com/iaincollins>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.1

/// <reference types="node" />

import { ConnectionOptions } from 'typeorm';
import { PossibleProviders } from './providers';
import { Adapter } from './adapters';

interface InitOptions {
    site: string;
    providers: Array<ReturnType<PossibleProviders>>;
    database?: ConnectionOptions | string;
    secret?: string;
    jwt?: JWTOptions;
    jwtSecret?: string;
    sessionMaxAge?: number;
    sessionUpdateAge?: number;
    verificationMaxAge?: number;
    pages?: PageOptions;
    debug?: boolean;
    basePath?: string;
    callbackUrlHandler?: (url: string, options: CallbackURLOptions) => Promise<void>;
    adapter?: Adapter;
    useSecureCookies?: boolean;
    cookies?: Cookies;
}

interface PageOptions {
    signIn?: string;
    signOut?: string;
    error?: string;
    verifyRequest?: string;
    newUser?: string | null;
}

interface Cookies {
    [cookieKey: string]: Cookie;
}

interface Cookie {
    name: string;
    options: CookieOptions;
}

interface CookieOptions {
    httpOnly?: boolean;
    // TODO: type available `sameSite` identifiers
    sameSite: string;
    path: string;
    secure: boolean;
}

interface JWTOptions {
    secret: string;
    maxAge: number;
    encode(options: JWTEncodeParams): Promise<string>;
    decode(options: JWTDecodeParams): Promise<string>;
}

interface JWTSignInOptions {
    expiresIn: string;
}

interface JWTVerificationOptions {
    maxTokenAge: string;
    algorithms: Array<string>;
}

interface JWTDecryptionOptions {
    algorithms: Array<string>;
}

interface JWTDecodeParams {
    secret: string;
    token: GenericObject;
    maxAge?: number;
    signingKey?: string;
    verificationKey?: string;
    verificationOptions?: JWTVerificationOptions;
    decryptionKey?: string;
    decryptionOptions?: JWTDecryptionOptions;
    encryption?: boolean;
}

interface JWTEncodeParams {
    secret: string;
    token: GenericObject;
    signingKey?: string;
    encryptionKey?: string;
    signingOptions?: JWTSignInOptions;
    encryptionOptions?: GenericObject;
    encryption?: boolean;
    maxAge?: number;
}

interface CallbackURLOptions {
    site: string;
    defaultCallbackUrl?: string;
    cookies?: Cookies;
    callbacks?: Callbacks;
}

interface GenericObject {
    [key: string]: any;
}

// TODO: Improve callback typings
interface Callbacks {
    signin(profile: GenericObject, account: GenericObject, metadata: GenericObject): Promise<void>;
    redirect(url: string, baseUrl: string): Promise<string>;
    session(session: GenericObject, token: GenericObject): Promise<GenericObject>;
    jwt(token: GenericObject, oAuthProfile: GenericObject): Promise<GenericObject>;
}

declare function NextAuth(req: NextApiRequest, res: NextApiResponse, options?: InitOptions): Promise<void>;
export default NextAuth;

/**
 * TODO: `dtslint` throws when parsing Next types... the following types are copied directly from `next/types` ...
 * @see https://github.com/microsoft/dtslint/issues/297
 */

interface NextApiRequest {
    query: {
        [key: string]: string | string[];
    };
    cookies: {
        [key: string]: string;
    };
    body: any;
    env: Env;
}

interface NextApiResponse<T = any> {
    send: Send<T>;
    json: Send<T>;
    status: (statusCode: number) => NextApiResponse<T>;
    setPreviewData: (
        data: object | string,
        options?: {
            maxAge?: number;
        },
    ) => NextApiResponse<T>;
    clearPreviewData: () => NextApiResponse<T>;
}

interface Env {
    [key: string]: string;
}

type Send<T> = (body: T) => void;
