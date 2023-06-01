import '../styles/Cell.css' ;

function Cell({ cellProps , updateFlag, updateRevealed}) {

    return (
        <div className="cell" onContextMenu={() => updateFlag(cellProps.x, cellProps.y)} onClick={() => updateRevealed(cellProps.x, cellProps.y)}>
            {cellProps.revealed && <>{cellProps.value}</>}
        </div>
    );
}
  
export default Cell;