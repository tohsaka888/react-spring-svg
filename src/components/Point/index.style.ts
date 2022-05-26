import styled from "styled-components";
import { Flex, primaryColor } from "../../common.style";

export const PointContainer = styled(Flex) <{ d: number }>`
  width: ${props => props.d + 'px'};
  height: ${props => props.d + 'px'};
  border-radius: 50%;
  border: 1px solid #f9f9f9;
  background-color: ${primaryColor};
  color: #fff;
  user-select: none;
  font-size: 12px;
`

export const PointName = styled.div<{ width: number }>`
  font-size: 12px;
  width: ${props => props.width + 'px'};
  text-align: center;
  user-select: none;
`