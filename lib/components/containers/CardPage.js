import React, { PropTypes } from 'react';

export default function CardPage({cards=[]}) {
    return (
        <div>
            {cards.map((card, i) =>
                <div id={`card-${i}`} key={i}>{card()}</div>
            )}
        </div>
    );
}

CardPage.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.func).isRequired
};
