import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { black, gray1, gray2, gray4, red } from '../../utils/colors';

const Pagination = ({ index, slides }) => {
    return (
        <View style={styles.pagination} pointerEvents="none">
            {slides.map((_, i) => {
                return (
                    <View
                        key={i}
                        style={[
                            styles.paginationDot,
                            index === i
                                ? styles.paginationDotActive
                                : styles.paginationDotInactive,
                        ]}
                    />
                );
            })}
        </View>
    );
}

export default Pagination

const styles = StyleSheet.create({
    //pagination
    pagination: {
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
    },
    paginationDot: {
        height: 8,
        width: 8,
        borderRadius: 10 / 2,
        backgroundColor: red,
        marginLeft: 10,
    },
    paginationDotActive: { backgroundColor: black },
    paginationDotInactive: { backgroundColor: gray4 },
})