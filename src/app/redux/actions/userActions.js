//data return
export const mapStateToProps = (state) => {
    let store = state.userReducer;
    return {
        userData: store.userData, 
        token: store.token,
        isAppIntro: store.isAppIntro
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

