function resetTabulatorTable(){
    try{
        app.statsTable.redraw(true);
    } catch(error) {
        console.log("Error Message redraw table: ", error.message)
    }
    
}