import { useState, createContext, ReactNode, useContext } from 'react';
import { OperationOnGrid } from '../Controller/Operations/OperationOnGrid';
import { useMatrixContext } from './MatrixProvider';

const OperationsContext = createContext<{
    operationList: OperationOnGrid[];
    setOperations: React.Dispatch<React.SetStateAction<OperationOnGrid[]>>;
    pushOperations: (operation: OperationOnGrid) => void;
    pushComplexOperations: (operation: OperationOnGrid) => void;
    undoOperations: (n?: number) => void;
}>({
    operationList: [],
    setOperations: () => { },
    pushOperations: () => { },
    pushComplexOperations: () => { },
    undoOperations: () => { },
});

const OperationsProvider = ({ children }: { children: ReactNode }) => {
    const [operationList, setOperations] = useState<OperationOnGrid[]>([]);
    const { changeMatrixValue } = useMatrixContext();

    function pushOperations(operation: OperationOnGrid) {
        operationList.push(operation);
    }
    const pushComplexOperations = (operation: OperationOnGrid) => {
        //Temporary it's the same
        pushOperations(operation);
    }
    const undoOperations = (n = 10) => {

        let count = 0;
        while (operationList.length > 0 && (count < n)) {
            let lastoperation = operationList.pop();
            if (!lastoperation)
                break;
            let simpleOperations = lastoperation.undoOperation();
            if (simpleOperations.length > 1) {
                simpleOperations.forEach(el => changeMatrixValue(el.i, el.j, el.prevColor));
                return; // Complex operation stop the undo
            } else if (simpleOperations.length === 1) {
                const { i, j, prevColor } = simpleOperations[0];
                changeMatrixValue(i, j, prevColor, false);
                count++;
            }
        }
    }

    return (
        <OperationsContext.Provider value={{ operationList, setOperations, pushOperations, pushComplexOperations, undoOperations }}>
            {children}
        </OperationsContext.Provider>
    );
}

const useOperationsContext = () => useContext(OperationsContext);

export { OperationsProvider, useOperationsContext };
