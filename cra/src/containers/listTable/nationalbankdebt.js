�}"  ��  ��S������QЇۢ��~��P/'�J�������¹�j+%�}c��u��%��
��~���gՎ��I5���H���G����R������_S��_��kc#����VFJ��O�?r��M�)~�4������$x%6�<k�ea�`kȦ	X����ē�F⹅��U/O��I���G� ��q�Tu�ǳt��l�Q��SKF��+Z\sg,>�H�It�A��[���	~�Χ�#0;�w5!�a��G��Y貪�'t�=�UP��-�ΟF�� N���z��%��6�/�|Aw�h�S�R?F�zw5�����"��]ܦz��k�l��={73���?Q�i_w�&jΈ+�i��{+�i;b�䚈{��
������|��{�G"��?�(�@�Y^�Y�#��c�g"�����:��ʴi=p��pZņt�ʾ��@&2A�,����hm9�z��7ɱNݢ=v>
                <Nationalbankdebt
                    data={this.props.data}
                />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        data: state.getDataList.initData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitData: (data) => {
            dispatch(getDataList(data))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(List);
