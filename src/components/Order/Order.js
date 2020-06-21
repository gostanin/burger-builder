import React from 'react';
import styles from './Order.module.css';

const order = (props) => (
    <div className={styles.Order}>
        <p>Ingredients: { Object.entries(props.ingredients).map((key) => {
            return <span
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-blick',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                    key={key[0]}>{key[0]} ({key[1]})</span>;
        })  }</p>
        <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
);

export default order;