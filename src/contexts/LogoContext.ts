import { createContext } from 'react';
import { LogoContextType } from '@custom-types/LogoTypes';

const LogoContext = createContext<LogoContextType | null>(null);
export default LogoContext;
