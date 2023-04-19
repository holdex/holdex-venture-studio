import { ApolloError, isApolloError } from "@apollo/client/core";

const transformError = (error: unknown, fallbackMessage: string) => {

    console.log('error', error, fallbackMessage);

    if (isApolloError(error as any)) {
        const _error = error as ApolloError;
        return {
            code: '500',
            message: _error.message,
            error: _error,
            stack: _error?.networkError || _error?.graphQLErrors || _error
        }
    } else if (error instanceof TypeError) {
        const _error = JSON.stringify(error as any);
        return {
            code: '500',
            message: (error as any)?.message ?? fallbackMessage,
            error: _error,
            stack: _error
        }
    } else if (typeof error === "object") {
        const _error = JSON.stringify(error as any);
        return {
            code: (error as any)?.code ?? '500',
            message: (error as any)?.message ?? fallbackMessage,
            error: _error,
            stack: _error
        }
    } else {
        const _error = JSON.stringify(error as any);
        return {
            code: '500',
            message: 'Client error',
            error: _error,
            stack: _error
        }
    }
}

export default transformError;
