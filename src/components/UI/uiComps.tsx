import React from "react";

export const ColoredLine2 = ({ color }: {color: string}) => (
    <hr
        style={{
            borderStyle: 'dashed',
            color: color,
            borderRadius: 1,
            borderWidth: 0.5,
            backgroundColor: color,
            height: 0.2,
            width: 345,
            marginLeft: -8,
            marginBottom: 18
        }}
    />
  );