import type { ReactNode } from 'react';
import Fallback from '../pages/Fallback';
import { useAuth } from '../contexts/AuthProvider';

interface IsAuthenticatedProps {
    fallback?: ReactNode;
    children: ReactNode;
}

const IsAuthenticated = ({
    fallback = <Fallback />,
    children
}: IsAuthenticatedProps) => {
    const { user } = useAuth();

    if (user) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
}

export default IsAuthenticated;
