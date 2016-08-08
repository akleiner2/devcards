import React from 'react';
import Card from './components/ui/Card';

const DEFAULT_NAME = Symbol("card");

function defaultName(exprs, dname) {
    const [first, name, ...rest] = exprs;
    if (typeof first === 'string') {
        return [first, name, rest];
    } else {
        return [dname, name, rest];
    }
}

function defaultDocumentation(exprs) {
    const [first, ...rest] = exprs;
    if (first.isDoc) {
        return [first, rest];
    } else {
        return [null, rest];
    }
}

function parseArgs(args, dname) {
    const [
        ns,
        name,
        exprs1
    ] = defaultName(args, dname);
    const [
        documentation,
        exprs2
    ] = defaultDocumentation(exprs1);
    return [ns, name, documentation, ...exprs2];
}

function parseCardArgs(args, dname) {
    let [
        ns,
        name,
        documentation,
        body,
        initialData,
        options
    ] = parseArgs(args, dname);

    options = {
        ...Card.defaultProps.options,
        ...options
    };

    if (name === dname) {
        options = {
            ...options,
            heading: false
        };
    }
    return [ns, name, documentation, body, initialData, options];
}

export default function defcard(...args) {
    const [
        ns, name, documentation, body, initialData, options
    ] = parseCardArgs(args, DEFAULT_NAME);

    return (
        <Card
            body={body}
            documentation={documentation}
            initialData={initialData}
            name={name}
            options={options}
        />
    );
}
