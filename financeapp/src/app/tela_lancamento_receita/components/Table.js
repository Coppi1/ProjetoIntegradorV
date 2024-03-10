
import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { NodeService } from './service/NodeService';

export default function Table() {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        NodeService.getTreeTableNodes().then((data) => setNodes(data));
    }, []);

    const actionTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button" icon="pi pi-search" rounded></Button>
                <Button type="button" icon="pi pi-pencil" severity="success" rounded></Button>
            </div>
        );
    };

    const togglerTemplate = (node, options) => {
        if (!node) {
            return;
        }

        const expanded = options.expanded;
        const iconClassName = classNames('p-treetable-toggler-icon pi pi-fw', {
            'pi-caret-right': !expanded,
            'pi-caret-down': expanded
        });

        return (
            <button type="button" className="p-treetable-toggler p-link" style={options.buttonStyle} tabIndex={-1} onClick={options.onClick}>
                <span className={iconClassName} aria-hidden="true"></span>
            </button>
        );
    };

    const header = <div className="text-xl font-bold">File Viewer</div>;
    const footer = (
        <div className="flex justify-content-start">
            <Button icon="pi pi-refresh" label="Reload" severity="warning" />
        </div>
    );

    return (
        <div className="card">
            <TreeTable value={nodes} header={header} footer={footer} togglerTemplate={togglerTemplate} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
                <Column field="type" header="Type"></Column>
                <Column body={actionTemplate} headerClassName="w-10rem" />
            </TreeTable>
        </div>
    );
}
