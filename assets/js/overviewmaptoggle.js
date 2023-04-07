function overviewMapToggle(value) {
    switch (value.checked) {
        case false:
            $('#overviewMap').slideUp(600);
            break;
        case true:
            $('#overviewMap').slideDown(600);
            break;
        default:
            $('#overviewMap').style.display = 'flex';
            break;
    }
}