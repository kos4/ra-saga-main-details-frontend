import {useEffect} from "react";
import {connect} from "react-redux";
import {fetchService} from "../store/storeService";
import {useParams} from "react-router-dom";

const ServicesDetail = props => {
  const {id} = useParams();
  useEffect(() => {
    props.fetch(id)
  }, []);

  if (props.error) {
    return (
      <>
        Произошла ошибка!
        <button onClick={() => props.fetch(id)}>Попробовать еще раз</button>
      </>
    );
  } else {
    if (props.loading) {
      return <div className="preloader"></div>;
    } else {
      const service = props.service;

      return (
        <div className="service">
          <div className="service__name">Название: {service.name}</div>
          <div className="service__description">Описание: {service.content}</div>
          <div className="service__price">Цена: {service.price}</div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetch: (id) => dispatch(fetchService(id))
  }
}

const mapStateToProps = (state) => state.serviceState;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesDetail);