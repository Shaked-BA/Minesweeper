import { FaFlag, FaBomb } from "react-icons/fa";

import '../styles/Cell.css' ;
import { setCellstyle } from '../utils/cellUtils';

function Cell({ cellProps , updateFlag, updateRevealed}) {
    const cellstyle = setCellstyle(cellProps.revealed, cellProps.value, cellProps.x, cellProps.y);
    return (
        <div 
            className="cell" 
            onContextMenu={(e) => updateFlag(e, cellProps.x, cellProps.y)} 
            onClick={() => updateRevealed(cellProps.x, cellProps.y)}
            style={cellstyle}>
            {cellProps.revealed ? 
                cellProps.value === 'X' ? <FaBomb className="bomb" /> : cellProps.value
                : cellProps.flagged && <FaFlag className="flag"/>}
        </div>
    );
}
  
export default Cell;