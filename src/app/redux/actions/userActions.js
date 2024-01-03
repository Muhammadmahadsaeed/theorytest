//data return
export const mapStateToProps = (state) => {
    let store = state.userReducer;
    return {
        userData: store.userData, 
        token: store.token,
        isAppIntro: store.isAppIntro,
        userFlag: store.userFlag,
        userFavourite: store.userFavourite
    }
};
//data set
export const mapDispatchToProps = (dispatch) => {
    return {
        updateRedux: (obj) => {
            dispatch({ type: 'update_redux', payload: obj })
        },
    }
}

