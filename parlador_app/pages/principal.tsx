import React, { useContext } from 'react';
import AuthContext from '../contexts/auth/auth';

// import { Container } from './styles';

const principal: React.FC = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useContext(AuthContext)

    console.log('user: ',user)

    return(
        <div>
            <h1>
                Página Principal
            </h1>
        </div>
    );
}

export default principal;