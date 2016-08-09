import React, { cloneElement, PropTypes } from 'react';
import Container from '../ui/Container';
import { Link } from 'react-router';

export default function App(props) {
    const {cards, children, params} = props;

    const links = Object.keys(cards)
        .sort()
        .filter(ns => ns !== 'index')
        .map(ns => ({title: ns,url: `/${ns}`}));

    const ns = params.ns || 'index';

    const fns = (
        cards[ns].cards || []
    ).map(c => c.func);

    return (
        <div>
            <Container>
                <div className="py2 flex flex-wrap">
                    <Link className="p1" to="/">Index</Link>
                    {links.map(({title, url}, i) =>
                        <Link className="p1" key={i} to={url} >{title}</Link>
                    )}
                </div>
            </Container>
            {cloneElement(children, {
                cards: fns
            })}
        </div>
    );
}

App.propTypes = {
    cards: PropTypes.objectOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                func: PropTypes.func.isRequired
            }).isRequired
        ).isRequired
    ),
    children: PropTypes.node.isRequired,
    params: PropTypes.shape({
        ns: PropTypes.string.isRequired
    }).isRequired
};
