import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => { 
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterseptor = axios.interceptors.response.use(req => req, err => {
            setError(err);
        });

        useEffect(() => { 
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.request.eject(resInterseptor);
            }
        }, [reqInterceptor, resInterseptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        }

        return (
            <React.Fragment>
                <Modal show={error}
                    orderClick={errorConfirmedHandler}>
                    {error}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    
    }
}

export default withErrorHandler;