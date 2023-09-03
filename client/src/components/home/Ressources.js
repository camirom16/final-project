import { styled } from "styled-components";
import { COLORS } from "../../styling/constants";

const NHSWidget = () => {
    return (
        <Container>
            <iframe className="widget"
            title="NHS.UK Live Well widget"
            src="https://developer.api.nhs.uk/widgets/live-well?uid=94593ef0-42d8-11ee-a14e-c36592fce2f6"
            width="100%"
            height="600px"
            style={{ border: 'solid 1px #ccc', maxWidth: '1000px' }}
            />
        </Container>
    );
}

const Container = styled.div`
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;

    & .widget {
        border-radius: 20px;
        background-color: ${COLORS.secondary};
        padding: 2%;
        margin-top: 2%;
    }
`

export default NHSWidget;
