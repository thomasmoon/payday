//let sharedStyles = {};

/* todo: check combination with spread
sharedStyles.cartoonShadow = {
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0
};*/

let sharedStyles = {
    activeScreen: {
        paddingTop: 32,
        textAlign: 'center'
    },
    cartoonShadow: {
        shadowColor: '#000000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0
    },
    helpText: {
        color: '#FFFFFF',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 32
    },
    extraText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 128,
        textAlign: 'center'
    },
    whiteButton: {
        backgroundColor: '#efefef',
        borderRadius: 30,
        marginHorizontal: 32,
        marginBottom: 0,
        padding: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 5,
        position: 'relative'
    },
    whiteButtonText: {
        color: '#000000',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center'
    },
    whiteButtonHighlight: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 10,
        position: 'absolute',
        top: 4,
        left: 12,
        right: 12
    }
}

export default sharedStyles;