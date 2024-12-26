import { useState, createContext, ReactNode, useContext } from 'react';
import { OperationOnGrid } from '../Controller/OperationOnGrid';
import { useMatrixContext } from './MatrixProvider';
import { changeMatrix } from '../Service/MatrixService';

const OperationsContext = createContext<{
    operationList: OperationOnGrid[];
    setOperations: React.Dispatch<React.SetStateAction<OperationOnGrid[]>>;
    pushOperations: (operation: OperationOnGrid) => void;
    undoOperations: (n: number) => void;
}>({
    operationList: [],
    setOperations: () => { },
    pushOperations: () => { },
    undoOperations: () => { },
});

const OperationsProvider = ({ children }: { children: ReactNode }) => {
    const [operationList, setOperations] = useState<OperationOnGrid[]>([]);
    const { matrix, setMatrix } = useMatrixContext();

    function pushOperations(operation: OperationOnGrid) {
        operationList.push(operation);
    }
    function undoOperations(n: number) {
        let count = 0;
        while (operationList.length > 0 && (count < n)) {
            let lastoperation: OperationOnGrid = operationList.pop()!;
            let complexOne = lastoperation.undoOperation();
            if (complexOne.length > 1) {
                for (let el of complexOne)
                    setMatrix(changeMatrix(matrix, el.i, el.j, el.prevColor));//MISSING PROPERTIES
                return;
            }
            let simpleOne = complexOne[0];
            let i = simpleOne.i;
            let j = simpleOne.j
            setMatrix(changeMatrix(matrix, i, j, simpleOne.prevColor, false)) //O(10n) with map is O(n)
            count++;
        }

    }

    return (
        <OperationsContext.Provider value={{ operationList, setOperations, pushOperations, undoOperations }}>
            {children}
        </OperationsContext.Provider>
    );
}

const useOperationsContext = () => useContext(OperationsContext);

export { OperationsProvider, useOperationsContext };
